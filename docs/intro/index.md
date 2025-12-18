---
sidebar_position: 1
---

# 문서 소개 (Introduction)

이 문서는 42 과제 **webserv** 프로젝트가  
**실제로 내부에서 어떻게 동작하는지**를 설명하기 위한 기술 문서입니다.

단순한 기능 나열이 아니라,

- 서버 아키텍처
- 이벤트 루프와 poll 기반 설계
- CGI 처리 방식과 파이프 구조
- 평가 및 테스트 관점

을 **이해 중심으로** 정리했습니다.

처음 읽는 분이라면, 아래 순서를 따라 읽는 것을 권장합니다.

---

## 1. 기초 개념 (가장 먼저 읽기)

webserv를 이해하기 전에 필요한 최소한의 개념들입니다.

- [웹이란 무엇인가](./what-is-the-web)
- [서버란 무엇인가](./what-is-a-server)
- [webserv 과제란 무엇인가](./what-is-webserv-project)
- [포트, 소켓, 그리고 연결](./port-socket-connection)
- [이 문서는 어떻게 구성되어 있는가](./how-this-doc-is-organized)
- [당황하지 마세요](./dont_panic)

---

## 2. 전체 구조 (아키텍처)

이 섹션에서는 서버의 **전체 구조와 책임 분리**를 설명합니다.

- [전체 아키텍처 개요](../architecture/global-overview)
- [ServerManager의 역할](../architecture/server-manager)
- [Client 상태 머신](../architecture/client-state-machine)
- [파일 디스크립터 생명주기](../architecture/fd-lifecycle)

---

## 3. 이벤트 루프와 I/O 모델

webserv가 **왜 poll 기반 이벤트 루프를 사용하는지**,  
그리고 요청이 어떻게 처리되는지를 다룹니다.

- [이벤트 루프란 무엇인가](../concepts/what-is-an-event-loop)
- [HTTP 요청 생명주기](../concepts/http-lifecycle)
- [poll vs select 비교](../concepts/poll-vs-select)

---

## 4. CGI 심화 설명 (핵심 파트)

이 프로젝트에서 가장 헷갈리기 쉬운 **CGI 처리 로직**을 집중적으로 설명합니다.

- [CGI 기본 개념](../concepts/cgi-basics)
- [왜 CGI FD를 poll에서 관리하는가](../deep-dive/why-cgi-fd-in-poll)
- [왜 CGI에는 파이프가 두 개 필요한가](../deep-dive/why-two-pipes-for-cgi)
- [타임아웃과 CGI 실행의 관계](../deep-dive/timeout-vs-cgi)
- [요청 중단(Abort) 시나리오](../deep-dive/abort-scenarios)

---

## 5. 테스트와 평가 관점

과제가 **어떻게 검증되고 평가되는지**를 기준으로 정리한 섹션입니다.

- [curl 테스트 전략](../testing/curl-strategy)
- [siege 테스트가 증명하는 것](../testing/siege-what-it-proves)
- [테스터의 동작 방식](../testing/tester-behavior)
- [자주 하는 오해들](../evaluation/common-misconceptions)
- [내가 설명할 수 있는 질문들](../evaluation/questions-i-can-answer)

---

## 이 문서를 이렇게 읽으면 좋습니다

- **42 평가자 / 리뷰어**  
  → 2번(아키텍처), 4번(CGI) 위주로 빠르게 훑기

- **webserv를 공부하는 학생**  
  → 1번부터 순서대로 읽기

- **면접 / 기술 설명**  
  → 아키텍처 또는 CGI 파트 바로 참조
