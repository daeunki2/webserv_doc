---
sidebar_position: 3
---

# 테스터 사용법 (Tester Behavior)

## 1. 개요

이 테스터는 웹서버가 **디렉토리, 파일, 확장자, 권한, location 설정**에 따라  
올바른 HTTP 응답을 반환하는지를 검증하기 위한 자동 테스트 도구이다.

단순히 요청이 “동작하는지”를 보는 것이 아니라,  
**서버가 HTTP 규약과 설정 의도를 정확히 해석하고 있는지**를 확인하는 데 목적이 있다.

특히 다음 항목들을 중점적으로 테스트한다.

- 존재하지 않는 확장자 처리
- CGI 대상 확장자 판별
- 디렉토리 접근 시 동작
- 중첩 디렉토리에서의 파일 처리
- location / root 설정의 정확성
- 대용량 요청 및 동시성 처리 안정성

---

## 2. 테스트용 디렉토리 구조 생성

테스터는 **고정된 디렉토리 및 파일 구조**를 전제로 동작한다.  
파일명, 디렉토리명, 확장자는 **대소문자까지 정확히 일치**해야 한다.

```bash
mkdir -p YoupiBanane/nop YoupiBanane/Yeah
touch YoupiBanane/youpi.bad_extension
touch YoupiBanane/youpi.bla
touch YoupiBanane/nop/youpi.bad_extension
touch YoupiBanane/nop/other.pouic
touch YoupiBanane/Yeah/not_happy.bad_extension
기본 HTTP 요청 테스트 1.1 POST 요청 (body size = 0)
```
이 구조는 이후 디렉토리 접근, 확장자 처리, CGI 판단 테스트에 사용된다.

## 3. 기본 HTTP 요청 테스트

### 3.1 POST 요청 (body size = 0)
```bash
Test POST http://127.0.0.0:8080/ with a size of 0
```

이 테스트는 다음을 검증한다.

POST 요청을 정상적으로 수신하는지

body가 없는 POST 요청을 오류 없이 처리하는지

서버가 불필요한 CGI 실행이나 크래시를 발생시키지 않는지

👉 POST + empty body 처리 안정성 확인

### 3.2 HEAD 요청
```bash
Test HEAD http://127.0.0.0:8080/
```

이 테스트는 다음을 검증한다.

HEAD 요청을 올바르게 인식하는지

response body 없이 header만 반환하는지

connection 상태가 정상적으로 유지되는지

👉 HEAD method 처리 정확성

### 3.3 Directory 및 Path 처리 테스트

```bash
Test GET http://127.0.0.0:8080/directory
```

이 테스트는 다음을 검증한다.

디렉토리 경로에 대한 GET 요청 처리

autoindex 또는 index fallback 로직

허용되지 않은 경우 405/403 처리 여부

### 3.4 존재하지 않는 리소스 (404)

```bash
Test GET Expected 404 on http://127.0.0.0:8080/directory/oulalala
Test GET Expected 404 on http://127.0.0.0:8080/directory/Yeah
```

이 테스트는 다음을 검증한다.

존재하지 않는 path에 대해 404 Not Found 반환

custom error page 정상 출력

서버 크래시 없이 요청 처리 종료

routing + error handling 검증

### 3.5 중첩 디렉토리 및 파일 경로

```bash
/directory/nop
/directory/nop/
/directory/nop/other.pouic
/directory/nop/other.pouac
```
이 테스트는 다음을 검증한다.

디렉토리/파일 경로 구분 처리

trailing slash 처리

확장자 기반 처리 로직

존재하지 않는 파일에 대한 404 처리

### 3.6 CGI 및 확장자 처리 테스트

```bash
/directory/youpi.bla
/directory/youpi.bad_extension
```
이 테스트는 다음을 검증한다.

CGI로 처리해야 하는 확장자 식별

허용되지 않은 확장자에 대한 처리

CGI 실행 조건 판단 로직

잘못된 확장자 요청 시 서버 안정성 유지

CGI routing 판단 검증

### 3.7 대용량 POST 요청 테스트
```bash
Test POST ... with a size of 100000000
```

이 테스트는 다음을 검증한다.

매우 큰 request body 수신

body size 제한 로직

서버 메모리 및 FD 안정성

CGI 실행 여부 판단

또한 다음과 같은 변형 테스트도 수행한다.
```bash
special headers size 100000 size 101 size 200
```
body 파싱 + limit 처리 검증

### 3.8 POST 전용 경로 테스트
```bash
/post_body with a size of 0
/post_body with a size of 100
/post_body with a size of 200
/post_body with a size of 101
```
이 테스트는 다음을 검증한다.

POST 전용 location 처리

body size에 따른 분기

정상 처리 / 에러 처리 정확성

### 3.9 동시성 및 부하 테스트 (가장 중요)
```
multiple workers(5) doing multiple times(15)
multiple workers(20) doing multiple times(5000)
multiple workers(128) doing multiple times(50)
```

이 테스트는 다음을 검증한다.

여러 client가 동시에 요청을 보낼 때 서버가 크래시하지 않는지

poll 기반 이벤트 루프가 정상적으로 동작하는지

특정 요청이 전체 서버를 block 하지 않는지

테스트 종료 후 서버가 정상 상태로 유지되는지

동시 접속 환경 안정성 검증