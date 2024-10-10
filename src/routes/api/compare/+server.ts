import bcrypt from 'bcrypt';
import type { RequestHandler } from './$types';

const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
	// 실제론 .env파일에서 가져와야 함
	const secret_key = 'YEK_TERCES';

	if (!plainPassword || plainPassword.trim() === '') {
		return false;
	}
	return await bcrypt.compare(plainPassword + secret_key, hashedPassword);
};

export const POST: RequestHandler = async ({ request }) => {
	const { plainPassword, hashedPassword } = await request.json();

	if (!plainPassword || plainPassword.trim() === '') {
		return new Response(JSON.stringify({ error: '비밀번호가 비어있습니다.', isMatch: false }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (!hashedPassword) {
		return new Response(
			JSON.stringify({ error: '해시된 비밀번호가 비어있습니다.', isMatch: false }),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const isMatch = await comparePassword(plainPassword, hashedPassword);

	return new Response(JSON.stringify({ isMatch }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
