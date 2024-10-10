import { describe, it, expect, beforeEach } from 'vitest';

describe('비밀번호 암호화 및 비교 테스트', () => {
	// 실제 시크릿 키는 .env파일에서 가져와야 합니다.
	const secret_key = 'YEK_TERCES';
	const password = 'password' + secret_key;
	const incorrectPassword = 'wrong_password';
	let hashedPassword: string;

	beforeEach(async () => {
		const response = await fetch('http://localhost:5173/api/encrypt', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password })
		});
		const result = await response.json();
		hashedPassword = result.hashedPassword;
	});

	describe('비밀번호 암호화', () => {
		it('비밀번호를 성공적으로 암호화해야 한다', async () => {
			const response = await fetch('http://localhost:5173/api/encrypt', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});
			const result = await response.json();
			expect(result.hashedPassword).toBeDefined();
			expect(result.hashedPassword).not.toBe(password);
		});

		it('✨ 같은 비밀번호로 다른 해시를 생성해야 한다 ✨', async () => {
			const response1 = await fetch('http://localhost:5173/api/encrypt', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});
			const result1 = await response1.json();

			const response2 = await fetch('http://localhost:5173/api/encrypt', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});
			const result2 = await response2.json();

			expect(result1.hashedPassword).not.toBe(result2.hashedPassword);
		});

		it('빈 비밀번호는 해시할 수 없어야 한다', async () => {
			const response = await fetch('http://localhost:5173/api/encrypt', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: '' })
			});
			expect(response.status).toBe(400);
		});
	});

	describe('비밀번호 비교', () => {
		it('올바른 비밀번호로 비교하면 일치해야 한다', async () => {
			const response = await fetch('http://localhost:5173/api/compare', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ plainPassword: password, hashedPassword })
			});
			const result = await response.json();
			expect(result.isMatch).toBe(true);
		});

		it('잘못된 비밀번호로 비교하면 불일치해야 한다', async () => {
			const response = await fetch('http://localhost:5173/api/compare', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ plainPassword: incorrectPassword, hashedPassword })
			});
			const result = await response.json();
			expect(result.isMatch).toBe(false);
		});

		it('빈 비밀번호로 비교하면 오류를 반환해야 한다', async () => {
			const response = await fetch('http://localhost:5173/api/compare', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ plainPassword: '', hashedPassword })
			});
			expect(response.status).toBe(400);
			const result = await response.json();
			expect(result.error).toBe('비밀번호가 비어있습니다.');
		});
	});
});
