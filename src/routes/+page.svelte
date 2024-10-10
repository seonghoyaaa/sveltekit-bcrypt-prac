<script lang="ts">
	let password = '';
	let comparePasswordInput = '';
	let hashedPassword = '';
	let isMatch: boolean | null = null;
	let showHashedPassword = false;
	let errorMessage = '';

	async function encryptPassword() {
		errorMessage = '';
		const response = await fetch('/api/encrypt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});

		const result = await response.json();
		if (response.ok) {
			hashedPassword = result.hashedPassword;
			showHashedPassword = true;
		} else {
			errorMessage = result.message;
			showHashedPassword = false;
		}
	}

	async function comparePassword() {
		errorMessage = '';
		const response = await fetch('/api/compare', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ plainPassword: comparePasswordInput, hashedPassword })
		});

		const result = await response.json();
		if (!response.ok) {
			errorMessage = result.message;
		}
		isMatch = result.isMatch;
	}
</script>

<div class="flex items-center justify-center h-screen bg-gray-100">
	<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
		<h1 class="text-2xl font-bold text-center mb-6">BCrypt 암호화 및 비교 테스트</h1>

		<h2 class="text-lg font-semibold mb-2">암호화할 비밀번호 입력</h2>
		<input
			type="text"
			bind:value={password}
			placeholder="암호화할 비밀번호 입력"
			class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
		<button
			on:click={encryptPassword}
			class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
			>암호화</button
		>

		{#if errorMessage}
			<p class="mt-4 text-red-500">{errorMessage}</p>
		{/if}

		{#if showHashedPassword}
			<div class="mt-6 p-3 bg-gray-50 border border-gray-300 rounded-md break-words">
				<p class="font-bold">암호화된 비밀번호: {hashedPassword}</p>
			</div>

			<h2 class="text-lg font-semibold mt-6 mb-2">비교할 비밀번호 입력</h2>
			<input
				type="text"
				bind:value={comparePasswordInput}
				placeholder="비교할 비밀번호 입력"
				class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				on:click={comparePassword}
				class="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
				>비교</button
			>

			<!-- 비교 결과, isMatch가 null이 아닐 때만 표시 -->
			{#if isMatch !== null}
				<p class="text-center mt-4 font-bold {isMatch ? 'text-green-500' : 'text-red-500'}">
					{isMatch ? '일치합니다' : '일치하지 않습니다'}
				</p>
			{/if}
		{/if}
	</div>
</div>
