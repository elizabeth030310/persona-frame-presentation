import { useState, useEffect } from "react";

const SLIDES = [
  // Slide 0: Cover
  {
    type: "cover",
    subtitle: "주간 진행 상황 보고",
    title: "Persona Frame",
    highlight: "4주차 발표",
    info: ["Team: Persona-frame", "김규민 | 신준수 | 유승민", "2026. 03. 18"],
  },
  // Slide 1: 진행 현황
  {
    type: "cards",
    title: "이번 주 주요 진행 현황",
    cards: [
      { icon: "📦", title: "기술 스택 최종 확정", desc: "프로젝트 전체 기술 스택 결정 및 선정 근거 정리", color: "#4F46E5" },
      { icon: "⚙️", title: "시스템 아키텍처 설계", desc: "음성 파이프라인 및 서비스 간 통신 구조 설계", color: "#6366F1" },
      { icon: "🎨", title: "UI 프로토타입 제작", desc: "웹 대기 화면, AI 활성 화면, 모바일 앱 디자인", color: "#06B6D4" },
      { icon: "🤖", title: "캐릭터 디자인 확정", desc: "AI 마스코트 '퍼비' 캐릭터 상태별 디자인", color: "#10B981" },
    ],
  },
  // Slide 2: 기술 스택
  {
    type: "table",
    title: "기술 스택 확정",
    rows: [
      { category: "Frontend", tech: "React + Vite", desc: "키오스크 디스플레이 UI" },
      { category: "Backend", tech: "FastAPI (Python)", desc: "REST API + WebSocket 서버" },
      { category: "AI", tech: "Gemini-2.5-flash", desc: "자연어 처리 및 대화형 AI" },
      { category: "STT", tech: "faster-whisper", desc: "음성 → 텍스트 변환" },
      { category: "Wake Word", tech: "Porcupine", desc: '"퍼비야" 호출어 감지' },
      { category: "TTS", tech: "Gemini-2.5-flash-TTS", desc: "텍스트 → 음성 변환" },
      { category: "Mobile", tech: "Flutter", desc: "크로스 플랫폼 앱 개발" },
      { category: "DB", tech: "PostgreSQL + pgvector", desc: "벡터 검색 지원 데이터베이스" },
      { category: "Hardware", tech: "RPi 4 / Jetson Nano", desc: "메인 컨트롤러 + GPIO 제어" },
      { category: "Mic", tech: "ReSpeaker 2-Mic USB", desc: "음성 입력 마이크 어레이" },
      { category: "Tools", tech: "Blender + Meshy.ai", desc: "3D 모델링 및 에셋 생성" },
    ],
  },
  // Slide 3: 기술 선택 이유
  {
    type: "whytech",
    title: "왜 이 기술을 선택했을까?",
    items: [
      { tech: "React (Not Next.js)", reason: "키오스크 환경에서 SSR/SEO 불필요, 정적 빌드로 가볍게 실행 가능", icon: "⚛️" },
      { tech: "FastAPI (Not Flask)", reason: "비동기 처리 기본 지원, WebSocket 내장, 자동 API 문서 생성", icon: "⚡" },
      { tech: "Gemini (Not ChatGPT)", reason: "무료 API 제공, TTS 기능 통합, 한국어 성능 우수", icon: "🤖" },
      { tech: "PostgreSQL (Not SQLite)", reason: "pgvector로 벡터 검색 지원, 대화 맥락 유사도 검색 가능", icon: "💾" },
      { tech: "Flutter (Not React Native)", reason: "네이티브 성능, 하나의 코드로 iOS/Android 동시 빌드", icon: "📱" },
    ],
  },
  // Slide 4: 사용 언어 정리
  {
    type: "languages",
    title: "사용 프로그래밍 언어",
    langs: [
      {
        name: "Python",
        color: "#3776AB",
        icon: "🐍",
        percent: 50,
        usedIn: ["FastAPI 백엔드 서버", "faster-whisper (STT)", "Porcupine (Wake Word)", "Gemini API 호출 로직", "GPIO 하드웨어 제어"],
      },
      {
        name: "JavaScript",
        color: "#F7DF1E",
        textColor: "#1E293B",
        icon: "🌐",
        percent: 30,
        usedIn: ["React + Vite (프론트엔드 UI)", "키오스크 디스플레이 화면", "WebSocket 클라이언트"],
      },
      {
        name: "Dart",
        color: "#0175C2",
        icon: "🎯",
        percent: 20,
        usedIn: ["Flutter 모바일 앱", "원격 제어 및 설정 관리"],
      },
    ],
  },
  // Slide 5: 기술 간 연결 관계도
  {
    type: "connections",
    title: "기술 간 연결 관계",
    subtitle: "각 기술이 어떻게 연결되어 동작하는지",
  },
  // Slide 6: 시스템 아키텍처
  {
    type: "architecture",
    title: "시스템 아키텍처",
    subtitle: "음성 처리 파이프라인",
    pipeline: [
      { label: "마이크 입력", icon: "🎤", color: "#3B82F6" },
      { label: "Porcupine\nWake Word", icon: "👂", color: "#4F46E5" },
      { label: "faster-whisper\nSTT", icon: "📝", color: "#6366F1" },
      { label: "Gemini\n2.5-flash", icon: "🧠", color: "#8B5CF6" },
      { label: "Gemini\nTTS", icon: "🔊", color: "#06B6D4" },
    ],
    bottom: [
      { title: "스피커 출력 + React UI 업데이트", desc: "FastAPI 백엔드가 모든 통신을 중앙에서 관리", color: "#10B981" },
      { title: "HTTP REST + WebSocket 통신", desc: "프론트엔드 ↔ 백엔드 ↔ 모바일 앱 연동", color: "#6366F1" },
    ],
  },
  // Slide 4: 웹 디자인 - 대기 화면
  {
    type: "design",
    title: "웹 디자인: 대기 화면 (Idle Screen)",
    iframeSrc: "/design.html",
    features: [
      "실시간 시계 (시:분:초)",
      "날씨 정보 + 주간 예보",
      "D-day 카운트다운",
      "음악 미니 플레이어",
      "시간대별 테마 자동 전환",
    ],
    subFeatures: ["6~18시: 밝은 하늘색", "18~6시: 다크 모드"],
  },
  // Slide 5: 웹 디자인 - AI 활성 화면
  {
    type: "design",
    title: "웹 디자인: AI 활성 화면 (Active Screen)",
    iframeSrc: "/design.html",
    features: [
      "추상적 오브 캐릭터 (중앙)",
      "회전 링 애니메이션",
      "대화 텍스트 표시 (유저↔AI)",
      "빠른 명령어 버튼",
      "전체 화면 전환 방식",
    ],
    subFeatures: ["추후 음성 입력으로 대체"],
  },
  // Slide 6: 모바일 디자인
  {
    type: "mobile",
    title: "모바일 디자인 (Flutter)",
    iframeSrc: "/mobile.html",
    features: [
      { icon: "🖼️", text: "액자 배경화면 및 테마 설정" },
      { icon: "✏️", text: "AI 비서 이름 커스터마이징" },
      { icon: "📸", text: "사진 업로드 및 일정 관리" },
      { icon: "🔄", text: "WebSocket 기반 실시간 동기화" },
    ],
  },
  // Slide 7: 캐릭터 디자인
  {
    type: "character",
    title: "캐릭터 디자인: 퍼비 (Perby)",
    placeholder: "여기에 캐릭터 디자인을\n삽입하세요",
    states: [
      { name: "Idle (대기)", desc: "기본 대기, 숨쉬기 애니메이션", color: "#3B82F6" },
      { name: "Listening (경청)", desc: "음성 입력 대기 중", color: "#10B981" },
      { name: "Thinking (생각)", desc: "AI 분석 및 답변 생성 중", color: "#8B5CF6" },
      { name: "Speaking (응답)", desc: "TTS 음성 출력 중", color: "#06B6D4" },
      { name: "Sleep (취침)", desc: "야간 모드 및 절전 상태", color: "#64748B" },
    ],
  },
  // Slide 8: 향후 계획
  {
    type: "next",
    title: "향후 계획 (Next Steps)",
    steps: [
      { icon: "💻", title: "프론트엔드 UI 개발 착수", desc: "React + Vite 환경 세팅\n대기 화면 / AI 화면 실제 구현", color: "#3B82F6" },
      { icon: "🗄️", title: "DB 스키마 설계 및 구현", desc: "SQLite 기반 테이블 설계\n일정, 메모, 설정값 저장 구조", color: "#6366F1" },
      { icon: "🖥️", title: "백엔드 서버 개발 시작", desc: "FastAPI REST API 구축\nWebSocket 실시간 통신 구조", color: "#8B5CF6" },
    ],
  },
  // Slide 9: Q&A
  {
    type: "qna",
  },
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const total = SLIDES.length;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setCurrent((p) => { const n = Math.min(p + 1, total - 1); setAnimKey((k) => k + 1); return n; });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrent((p) => { const n = Math.max(p - 1, 0); setAnimKey((k) => k + 1); return n; });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  const slide = SLIDES[current];

  const renderSlide = () => {
    switch (slide.type) {
      case "cover":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <div style={{ fontSize: "16px", color: "#94A3B8", letterSpacing: "4px", marginBottom: "16px", textTransform: "uppercase" }}>{slide.subtitle}</div>
            <div style={{ fontSize: "72px", fontWeight: 800, color: "#F1F5F9", lineHeight: 1.1, marginBottom: "12px" }}>{slide.title}</div>
            <div style={{ fontSize: "36px", fontWeight: 300, color: "#818CF8", marginBottom: "60px" }}>{slide.highlight}</div>
            {slide.info.map((t, i) => (
              <div key={i} style={{ fontSize: "15px", color: "#64748B", marginBottom: "6px" }}>{t}</div>
            ))}
            <div style={{ position: "absolute", right: "80px", top: "50%", transform: "translateY(-50%)", width: "180px", height: "180px", borderRadius: "50%", background: "linear-gradient(135deg, #4F46E5, #06B6D4)", opacity: 0.15 }} />
            <div style={{ position: "absolute", right: "140px", top: "30%", width: "100px", height: "100px", borderRadius: "50%", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", opacity: 0.1 }} />
          </div>
        );

      case "cards":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "36px" }}>{slide.title}</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
              {slide.cards.map((c, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: "16px", padding: "32px 36px",
                  border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", gap: "22px",
                  animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
                }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: 600, color: "#F1F5F9", marginBottom: "8px" }}>{c.title}</div>
                    <div style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.6 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "table":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "36px" }}>{slide.title}</h1>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "180px 260px 1fr", background: "#4F46E5", padding: "16px 28px" }}>
                {["구분", "기술", "용도"].map((h) => (
                  <div key={h} style={{ fontSize: "16px", fontWeight: 600, color: "#FFF", textTransform: "uppercase", letterSpacing: "1px" }}>{h}</div>
                ))}
              </div>
              {slide.rows.map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "180px 260px 1fr", padding: "14px 28px",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  animation: `fadeSlideUp 0.4s ease ${i * 0.05}s both`,
                }}>
                  <div style={{ fontSize: "17px", fontWeight: 600, color: "#F1F5F9" }}>{r.category}</div>
                  <div style={{ fontSize: "17px", color: "#818CF8" }}>{r.tech}</div>
                  <div style={{ fontSize: "16px", color: "#94A3B8" }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "whytech":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "36px" }}>{slide.title}</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {slide.items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "22px",
                  padding: "20px 28px", borderRadius: "14px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`,
                }}>
                  <div style={{ fontSize: "32px", flexShrink: 0, width: "48px", textAlign: "center" }}>{item.icon}</div>
                  <div style={{ width: "260px", flexShrink: 0 }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#818CF8" }}>{item.tech}</div>
                  </div>
                  <div style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: 1.5 }}>{item.reason}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "36px" }}>{slide.title}</h1>
            <div style={{ display: "flex", gap: "28px" }}>
              {slide.langs.map((lang, i) => (
                <div key={i} style={{
                  flex: 1, borderRadius: "16px", overflow: "hidden",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  animation: `fadeSlideUp 0.5s ease ${i * 0.15}s both`,
                }}>
                  <div style={{ background: lang.color, padding: "24px 28px", display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "34px" }}>{lang.icon}</span>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: lang.textColor || "#FFF" }}>{lang.name}</div>
                      <div style={{ fontSize: "15px", color: lang.textColor ? `${lang.textColor}99` : "rgba(255,255,255,0.7)", marginTop: "3px" }}>프로젝트의 약 {lang.percent}%</div>
                    </div>
                  </div>
                  <div style={{ padding: "22px 28px" }}>
                    {lang.usedIn.map((use, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: lang.color, flexShrink: 0 }} />
                        <span style={{ fontSize: "16px", color: "#CBD5E1" }}>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "connections":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "4px" }}>{slide.title}</h1>
            <div style={{ fontSize: "17px", color: "#94A3B8", marginBottom: "32px" }}>{slide.subtitle}</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
              {/* Top: External Cloud */}
              <div style={{
                padding: "18px 40px", borderRadius: "12px", background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.25)", textAlign: "center",
                animation: "fadeSlideUp 0.5s ease 0s both",
              }}>
                <div style={{ fontSize: "18px", fontWeight: 600, color: "#A78BFA" }}>외부 클라우드</div>
                <div style={{ fontSize: "15px", color: "#94A3B8", marginTop: "5px" }}>Gemini-2.5-flash (AI + TTS)</div>
              </div>
              <div style={{ fontSize: "20px", color: "#4F46E5" }}>↕ API 호출</div>
              {/* Center: FastAPI Server */}
              <div style={{
                padding: "24px 56px", borderRadius: "14px", background: "rgba(79,70,229,0.15)",
                border: "2px solid rgba(79,70,229,0.4)", textAlign: "center", minWidth: "440px",
                animation: "fadeSlideUp 0.5s ease 0.1s both",
              }}>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#818CF8" }}>FastAPI 백엔드 (Python)</div>
                <div style={{ fontSize: "15px", color: "#94A3B8", marginTop: "6px" }}>중앙 컨트롤러 · REST API · WebSocket · PostgreSQL</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "100px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "16px", color: "#4F46E5", marginBottom: "4px" }}>↕ WebSocket</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "16px", color: "#4F46E5", marginBottom: "4px" }}>↕ HTTP REST</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "16px", color: "#4F46E5", marginBottom: "4px" }}>↕ 로컬 통신</div>
                </div>
              </div>
              {/* Bottom: 3 components */}
              <div style={{ display: "flex", gap: "28px" }}>
                <div style={{
                  padding: "22px 34px", borderRadius: "12px", background: "rgba(6,182,212,0.1)",
                  border: "1px solid rgba(6,182,212,0.25)", textAlign: "center", minWidth: "210px",
                  animation: "fadeSlideUp 0.5s ease 0.2s both",
                }}>
                  <div style={{ fontSize: "26px", marginBottom: "8px" }}>🖥️</div>
                  <div style={{ fontSize: "17px", fontWeight: 600, color: "#22D3EE" }}>React 프론트엔드</div>
                  <div style={{ fontSize: "14px", color: "#94A3B8", marginTop: "5px" }}>JavaScript · 키오스크 UI</div>
                </div>
                <div style={{
                  padding: "22px 34px", borderRadius: "12px", background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)", textAlign: "center", minWidth: "210px",
                  animation: "fadeSlideUp 0.5s ease 0.3s both",
                }}>
                  <div style={{ fontSize: "26px", marginBottom: "8px" }}>📱</div>
                  <div style={{ fontSize: "17px", fontWeight: 600, color: "#34D399" }}>Flutter 모바일 앱</div>
                  <div style={{ fontSize: "14px", color: "#94A3B8", marginTop: "5px" }}>Dart · 원격 제어</div>
                </div>
                <div style={{
                  padding: "22px 34px", borderRadius: "12px", background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)", textAlign: "center", minWidth: "210px",
                  animation: "fadeSlideUp 0.5s ease 0.4s both",
                }}>
                  <div style={{ fontSize: "26px", marginBottom: "8px" }}>🔧</div>
                  <div style={{ fontSize: "17px", fontWeight: 600, color: "#60A5FA" }}>RPi 4 / Jetson Nano</div>
                  <div style={{ fontSize: "14px", color: "#94A3B8", marginTop: "5px" }}>Porcupine · faster-whisper · GPIO</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "architecture":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 60px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "4px" }}>{slide.title}</h1>
            <div style={{ fontSize: "17px", color: "#94A3B8", marginBottom: "36px" }}>{slide.subtitle}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "36px" }}>
              {slide.pipeline.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{
                    width: "150px", height: "115px", borderRadius: "14px", background: p.color,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
                  }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>{p.icon}</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#FFF", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.3 }}>{p.label}</div>
                  </div>
                  {i < slide.pipeline.length - 1 && <div style={{ fontSize: "24px", color: "#6366F1" }}>→</div>}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {slide.bottom.map((b, i) => (
                <div key={i} style={{
                  padding: "22px 28px", borderRadius: "12px",
                  background: `${b.color}15`, border: `1px solid ${b.color}30`,
                }}>
                  <div style={{ fontSize: "18px", fontWeight: 600, color: b.color, marginBottom: "6px" }}>{b.title}</div>
                  <div style={{ fontSize: "15px", color: "#94A3B8" }}>{b.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "15px", color: "#64748B" }}>
              데이터 저장: PostgreSQL + pgvector  |  하드웨어: RPi 4 / Jetson Nano  |  모바일: Flutter
            </div>
          </div>
        );

      case "design":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "32px" }}>{slide.title}</h1>
            <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
              <div style={{
                flex: "1.8", aspectRatio: "16/10", borderRadius: "16px", overflow: "hidden",
                border: "2px solid rgba(99,102,241,0.3)", background: "#000",
              }}>
                <iframe src={slide.iframeSrc} style={{ width: "100%", height: "100%", border: "none", transform: "scale(1)", transformOrigin: "0 0" }} title="design preview" />
              </div>
              <div style={{ flex: "1" }}>
                <div style={{ fontSize: "22px", fontWeight: 600, color: "#F1F5F9", marginBottom: "24px" }}>주요 요소</div>
                {slide.features.map((f, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px",
                    animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`,
                  }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#6366F1", flexShrink: 0 }} />
                    <span style={{ fontSize: "17px", color: "#E2E8F0" }}>{f}</span>
                  </div>
                ))}
                {slide.subFeatures && (
                  <div style={{ marginTop: "6px", paddingLeft: "20px" }}>
                    {slide.subFeatures.map((sf, i) => (
                      <div key={i} style={{ fontSize: "15px", color: "#94A3B8", marginBottom: "8px" }}>· {sf}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "mobile":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 60px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "28px" }}>{slide.title}</h1>
            <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
              <div style={{
                width: "380px", height: "650px", borderRadius: "28px", overflow: "hidden",
                border: "2px solid rgba(99,102,241,0.3)", background: "#000", flexShrink: 0,
              }}>
                <iframe src={slide.iframeSrc} style={{ width: "100%", height: "100%", border: "none" }} title="mobile preview" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "17px", fontWeight: 600, color: "#94A3B8", marginBottom: "22px" }}>Flutter 크로스 플랫폼 앱 주요 기능</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {slide.features.map((f, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "14px 18px", borderRadius: "10px", background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      animation: `fadeSlideUp 0.4s ease ${i * 0.1}s both`,
                    }}>
                      <div style={{ fontSize: "22px" }}>{f.icon}</div>
                      <div style={{ fontSize: "15px", color: "#E2E8F0" }}>{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "character":
        return (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: 700, color: "#F1F5F9", marginBottom: "32px" }}>{slide.title}</h1>
            <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
              <div style={{
                flex: "1.5", aspectRatio: "4/3.5", borderRadius: "16px", border: "2px dashed rgba(99,102,241,0.3)",
                background: "rgba(99,102,241,0.05)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ fontSize: "18px", color: "#64748B", textAlign: "center", whiteSpace: "pre-line" }}>{slide.placeholder}</div>
              </div>
              <div style={{ flex: "1" }}>
                <div style={{ fontSize: "22px", fontWeight: 600, color: "#F1F5F9", marginBottom: "28px" }}>캐릭터 상태 (Status)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  {slide.states.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "16px",
                      animation: `fadeSlideUp 0.4s ease ${i * 0.1}s both`,
                    }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: "18px", fontWeight: 600, color: "#E2E8F0" }}>{s.name}</div>
                        <div style={{ fontSize: "15px", color: "#94A3B8", marginTop: "3px" }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "next":
        return (
          <div style={{ padding: "60px 80px" }}>
            <h1 style={{ fontSize: "36px", fontWeight: 700, color: "#F1F5F9", marginBottom: "44px" }}>{slide.title}</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {slide.steps.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "24px",
                  padding: "24px 28px", borderRadius: "14px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  animation: `fadeSlideUp 0.5s ease ${i * 0.15}s both`,
                }}>
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "14px", background: s.color,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: 600, color: "#F1F5F9", marginBottom: "6px" }}>{s.title}</div>
                    <div style={{ fontSize: "13px", color: "#94A3B8", whiteSpace: "pre-line", lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "qna":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <div style={{ fontSize: "72px", fontWeight: 800, color: "#F1F5F9", marginBottom: "20px" }}>Q & A</div>
            <div style={{ fontSize: "18px", color: "#818CF8", marginBottom: "40px" }}>궁금하신 점이 있다면 편하게 질문해 주세요.</div>
            <div style={{ fontSize: "14px", color: "#64748B" }}>발표를 들어주셔서 감사합니다.</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#F1F5F9", marginTop: "8px" }}>Team Persona-frame</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      width: "100vw", height: "100vh", background: "#0F0F1A",
      fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
      overflow: "hidden", position: "relative",
    }}>
      {/* Background effects */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #4F46E5, #06B6D4)" }} />

      {/* Slide content */}
      <div key={animKey} style={{ width: "100%", height: "100%", position: "relative", zIndex: 1, animation: "fadeIn 0.4s ease" }}>
        {renderSlide()}
      </div>

      {/* Navigation */}
      <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "16px", zIndex: 10 }}>
        <button onClick={() => { setCurrent(Math.max(current - 1, 0)); setAnimKey(animKey + 1); }}
          style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#94A3B8", fontSize: "18px", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}>←</button>
        <span style={{ fontSize: "13px", color: "#64748B", fontVariantNumeric: "tabular-nums", minWidth: "60px", textAlign: "center" }}>{current + 1} / {total}</span>
        <button onClick={() => { setCurrent(Math.min(current + 1, total - 1)); setAnimKey(animKey + 1); }}
          style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#94A3B8", fontSize: "18px", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}>→</button>
      </div>

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: "#4F46E5", width: `${((current + 1) / total) * 100}%`, transition: "width 0.4s ease" }} />

      {/* Slide dots */}
      <div style={{ position: "absolute", bottom: "60px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <div key={i} onClick={() => { setCurrent(i); setAnimKey(animKey + 1); }}
            style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === current ? "#6366F1" : "rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.3s ease" }} />
        ))}
      </div>

      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        button:hover { background: rgba(255,255,255,0.1) !important; color: #E2E8F0 !important; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
