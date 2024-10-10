import bcrypt from 'bcrypt';
import type { RequestHandler } from './$types';

async function hashPassword(password: string): Promise<string> {
	// 실제론 .env파일에서 가져와야 함
	const secret_key = 'YEK_TERCES';

	if (!password || password.trim() === '') {
		throw new Error('비밀번호가 비어있습니다.');
	}
	return await bcrypt.hash(password + secret_key, 10);
}

export const POST: RequestHandler = async ({ request }) => {
	const { password } = await request.json();

	try {
		const hashedPassword = await hashPassword(password);
		return new Response(JSON.stringify({ hashedPassword }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('비밀번호 해시 중 오류:', error);
		if (error instanceof Error && error.message === '비밀번호가 비어있습니다.') {
			return new Response(JSON.stringify({ message: '비밀번호가 비어있습니다.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		return new Response(JSON.stringify({ message: '비밀번호 해시 중 오류가 발생했습니다.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
