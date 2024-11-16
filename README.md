# Canvas-GPT-Quiz

- 랜덤한 제시어가 주어지면 사용자가 Canvas에 그린 이미지를 OpenAI 가 추론하는 캐치마인드와 유사한 형식의 퀴즈게임
- Canvas API 를 활용하여 색깔 선택, 선 굵기 조절, 지우개, 실행취소, 이미지로 저장 기능 구현

## 개발 환경

### Node.js 버전

- `Node.js v20.18.0`
- `npm v9.6.7`

### 의존성 설치

```bash
npm install
```

### 개발서버 실행

```bash
npm run dev
```

### 라이브러리

- `Next.js v15.0.2(App Router)`
- `TailwindCSS v3.4.14`
- `React v19`
- `Supabase v2.46.1`
- `OpenAI v4.71.0`

### 환경변수 예시

```
OPENAI_API_KEY=example
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey....
```

## 구조

1. Next 서버로부터 랜덤 단어 발급
2. 사용자가 캔버스에 그린 이미지를 Base64 포맷 변환
3. Next 서버에서 OpenAI 에 프롬프트와 함께 Base64 이미지 쿼리
4. OpenAI의 응답을 받으면 Next 서버에 전달
5. 결과값을 프론트엔드에 전달
6. Supabase Storage 에 이미지 업로드

![Canvas-gpt-quiz)](https://github.com/user-attachments/assets/5afb70a7-8181-438a-96a8-b1e6bab2a3ed)
