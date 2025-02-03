이 프로젝트는 서울의 기후 데이터를 시각적으로 분석하고 표현하는 대시보드를 제공합니다. React와 TypeScript를 활용한 프론트엔드 구성과 Recharts를 통한 데이터 시각화에 중점을 둡니다.

핵심 기능:
실시간 기후 정보 시각화
서울의 현재 기온, 최고/최저 기온 표시
시간대별 기온 변화 트렌드 분석
강수량, 구름량 등 기본 날씨 데이터 제공


기간별 데이터 분석:

일별/주별/월별 기온 변화 추이
과거 데이터와의 비교 분석
기간 설정을 통한 맞춤형 데이터 조회


직관적인 데이터 시각화:

Recharts를 활용한 인터랙티브 차트
온도, 강수량 등의 복합 데이터 표현
사용자 친화적인 인터페이스



기술 스택:

Frontend: React, TypeScript
데이터 시각화: Recharts
API: Open-Meteo Weather API
상태관리: React Query

```
src/
├── api/
│   └── weather/
│       └── weatherApi.tsx         // 날씨 API 통신
├── types/
│   ├── weather.ts                 // 날씨 관련 타입 정의
│   └── activity.ts                // 활동 관련 타입 정의
├── components/
│   ├── charts/
│   │   └── WeatherChart.tsx       // 날씨 차트 컴포넌트
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   └── activity/
│       ├── WeatherActivity.tsx    // 날씨 기반 활동 추천
│       ├── ActivityLogic.tsx      // 활동 추천 로직
│       └── weather/
│           ├── WeatherOptions.tsx // 날씨 옵션 컴포넌트
│           └── WeatherOptions.css
├── pages/
│   ├── Dashboard.tsx
│   ├── Dashboard.css
│   ├── SeoulWeather.tsx
│   └── SeoulWeather.css
├── utils/
│   ├── weatherDataTransformer.tsx // 날씨 데이터 변환
│   └── weatherChartRenderer.tsx   // 차트 데이터 렌더링 유틸리티
├── App.tsx
├── App.css
└── main.tsx


```
