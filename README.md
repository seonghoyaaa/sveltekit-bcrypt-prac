# SvelteKit bcrypt 암호화 예시

![Views](https://komarev.com/ghpvc/?username=seonghoyaaa&repo=sveltekit-bcrypt-prac)

이 프로젝트는 SvelteKit을 사용하여 bcrypt 암호화 예시 입니다.

## 주요 기능

- 비밀번호 암호화: bcrypt를 사용하여 안전하게 비밀번호를 해시화합니다.
- 비밀번호 비교: 입력된 비밀번호와 저장된 해시를 비교합니다.
- API 엔드포인트: 암호화 및 비교 기능을 위한 RESTful API를 제공합니다.

## 프로젝트 설정

1. 저장소를 클론합니다:

   ```bash
   git clone https://github.com/seonghoyaaa/sveltekit-bcrypt.git
   cd sveltekit-bcrypt
   ```

2. 의존성을 설치합니다:
   ```bash
   npm install
   ```

## 개발 서버 실행

개발 서버를 시작하려면 다음 명령어를 실행하세요:

```bash
npm run dev
```

## 테스트 실행

테스트를 실행하려면 다음 명령어를 사용하세요:
5173 개발 서버가 켜진 상태에서 실행해야 합니다.

```bash
npx vitest
```

## API 사용법

### 비밀번호 암호화

- 엔드포인트: `POST /api/encrypt`
- 요청 본문: `{ "password": "사용자_비밀번호" }`
- 응답: `{ "hashedPassword": "암호화된_비밀번호" }`

### 비밀번호 비교

- 엔드포인트: `POST /api/compare`
- 요청 본문: `{ "plainPassword": "입력_비밀번호", "hashedPassword": "저장된_해시" }`
- 응답: `{ "isMatch": true/false }`
