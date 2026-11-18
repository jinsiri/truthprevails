# 🌐 TRUTH WORLD — truthprevails.me

> **"Two ways to explore, one truth."**<br/>
> 하나의 이력, 두 가지 탐험 방식 — 게임 모드 & 클래식 모드

<p>
  <a href="https://truthprevails.me">
    <img src="https://ik.imagekit.io/ry2wztqvv/truthprevails/images/game/intro.png?tr=w-1600" alt="TRUTH WORLD 인트로 화면" width="100%" />
  </a>
</p>

**[🔗 사이트 바로가기](https://truthprevails.me)**

---

## 🧭 기획 의도

- 핵심만 빠르게 → 클래식 / 천천히 둘러보기 → 게임
- **모드는 둘, 데이터는 하나**

| 고민                      | 결정                      | 구현                                           |
| ------------------------- | ------------------------- | ---------------------------------------------- |
| 게임은 정보 찾기가 어려움 | 모드 선택 + 어디서든 전환 | `features/portfolio` 데이터를 두 UI가 공유     |
| 게임 UI는 접근성이 약함   | 키보드만으로 전부 도달    | `useKeyboardList`, `tablist`, 장식 이미지 숨김 |
| 프로젝트 나열은 지루함    | 갤러리 전시 + 작가 대화창 | 16:9 무대 좌표계 위 액자 배치, 모바일은 모달   |
| 끝까지 안 보고 이탈함     | 탐색을 퀘스트로 구성      | Zustand `persist` + 버전 무관 진행도 병합      |
| 모바일엔 키보드 없음      | 모바일 전용 조작 설계     | 터치 컨트롤 + 캐릭터 추적 카메라(`clamp()`)    |

**덜어내기** — 구름 애니메이션, 화면 페이드, 모바일 안내창은 써 보고 제거

---

## 🎮 Game Mode

<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ik.imagekit.io/ry2wztqvv/truthprevails/images/game/preview_game_night_v2.png?tr=w-1600" />
    <img src="https://ik.imagekit.io/ry2wztqvv/truthprevails/images/game/preview_game_day_v2.png?tr=w-1600" alt="게임 모드 메인 맵 화면" width="100%" />
  </picture>
</p>

- 🏫 학교 · 🏢 회사 · 🖼️ 갤러리 · 📮 인포센터 → 학습 · 경력 · 프로젝트 · 연락처
- 퀘스트 5종, 점프로 숨은 아이템 수집
- 갤러리: PC는 벽 액자, 모바일은 한 점씩 넘기는 전시

### 조작법

| 동작      | 키보드                     | 모바일    |
| --------- | -------------------------- | --------- |
| 이동      | `←` `→` / `A` `D`          | 방향 버튼 |
| 달리기    | `Shift` + 이동             | –         |
| 점프      | `Space` (2단 점프)         | 점프 버튼 |
| 건물 입장 | `↑` / `W`                  | 입장 버튼 |
| 목록 선택 | 방향키 + `Enter` / `Space` | 탭        |

---

## 📄 Classic Mode

<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ik.imagekit.io/ry2wztqvv/truthprevails/images/preview_classic_night.png?v=3&tr=w-1600" />
    <img src="https://ik.imagekit.io/ry2wztqvv/truthprevails/images/preview_classic_day.png?v=3&tr=w-1600" alt="클래식 모드 화면" width="100%" />
  </picture>
</p>

- 잡지 지면 스타일 원페이지, 다크 모드 지원

---

## 🔧 기술 포인트

- **게임 루프 직접 구현** — `requestAnimationFrame` + 델타 타임, 중력 기반 2단 점프, 수집품 충돌 판정
- **진행도 보존** — Zustand `persist` + 커스텀 `merge`로 퀘스트가 늘어도 기존 진행 유지
- **뒤로 가기 보정** — `history.state`에 방문 깊이 기록, 직접 진입해도 사이트 밖으로 안 나감
- **정적 배포 대응** — 미들웨어 대신 클라이언트 기기 판별, ImageKit 커스텀 로더, next/font
- **반응형** — 너비 + 화면 방향 기준 Tailwind 커스텀 variant (`wide` / `narrow` / `tablet`)

---

## 🛠 Tech Stack

| 분류      | 사용 기술                                                                |
| --------- | ------------------------------------------------------------------------ |
| Framework | **Next.js 16** (App Router, Static Export), **React 19**, **TypeScript** |
| Styling   | **Tailwind CSS 4**, Framer Motion                                        |
| State     | **Zustand** (UI 상태, `persist`로 퀘스트 진행도 저장)                    |
| Asset     | ImageKit (이미지 CDN), next/font                                         |
| Deploy    | GitHub Actions → GitHub Pages                                            |

---

## 📁 폴더 구조

```
app/            라우트 (/, /classic, /game/*)
components/     공통 · classic · game UI 컴포넌트
features/       데이터와 도메인 로직 (game: 맵·퀘스트·수집품 / portfolio: 이력 데이터)
hooks/          useJump, useKeyboardList, useSiteBack 등
store/          Zustand 스토어
```

## 🚀 실행

```bash
npm install
npm run dev   # http://localhost:3002
```
