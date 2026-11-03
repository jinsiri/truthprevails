# 🌐 truthprevails.me

> **"Two ways to explore, one truth."**<br/>
> 클래식 모드와 게임 모드, 두 가지 인터페이스로 저의 여정을 소개하는 개인 포트폴리오 사이트입니다.

---

## ✨ 핵심 컨셉 (Core Concept)

이 사이트는 사용자의 취향에 따라 두 가지 모드를 제공하며, 특히 **웹 접근성**에 중점을 두었습니다.

* **Classic Mode**: 가독성과 전문성에 집중한 정갈한 레이아웃입니다.
* **Game Mode (A11y Focused)**:
    * 인터랙티브한 게임 UI를 경험할 수 있습니다.
    * **Full Keyboard Navigation**: 마우스 없이 키보드만으로도 모든 콘텐츠를 탐험할 수 있도록 설계하여 웹 접근성(Accessibility)을 실천했습니다.
    * **Mobile Touch Controls**: 모바일에서는 캐릭터를 따라 가로로 스크롤되는 맵과 이동·점프·입장 터치 버튼으로 플레이할 수 있습니다.
    * **Quest System**: 스탯·스킬·인벤토리 확인과 건물 탐험을 퀘스트로 구성했고, 진행도는 브라우저에 저장됩니다.

---

## 🛠 Tech Stack

프로젝트의 성능과 확장성을 위해 최신 기술들을 조합하여 구축했습니다.

### Framework & Language
- **Next.js 16 (App Router)**: 정적 내보내기(Static Export) 후 GitHub Actions로 GitHub Pages에 배포.
- **React 19**: 최신 리액트 생태계의 기능을 적극 활용.
- **TypeScript**: 안정적인 개발을 위한 엄격한 타입 추론.

### Styling & Interaction
- **Tailwind CSS 4**: 유틸리티 기반의 스타일링으로 빠르고 일관된 UI 구현.
- **Framer Motion**: 클래식 모드의 내비게이션·페이지 콘텐츠 애니메이션.
- **Icons**: Lucide-react, Tabler Icons, React-icons.

### State Management
- **Zustand**: 게임 모드의 팝업(UI) 상태와 퀘스트 진행도 관리 (퀘스트는 `persist`로 localStorage에 저장).

---

## 🔗 Link

* **Official Site:** [https://truthprevails.me](https://truthprevails.me)