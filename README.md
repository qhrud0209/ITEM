AP 프로그래밍과 문제 해결 수행평가

[실행방법]
1. cd server
2. venv\Scripts\activate
3. py server.py
4. 새로운 터미널 생성
5. cd client
6. npm start



1. 개발 배경 및 필요성
   - 필요한 물품의 위치를 쉽게 알 수 없음. → 찾는 데 많은 시간 소요 + 예산 낭비
   - 과거 선배님이 구매하신 물품의 사용 용도를 알 수 없음 → 예산 낭비
2. 개발 목표
   - 교내 물품 내역 정보를 저장 및 검색 가능하도록 해 연구를 진행하는 학생들이 용이하게 물품을 사용하고 관리할 수 있도록 함.
3. 주요 기능
  - 물품 등록 : 물품명, 물품 위치, 기능, 물품 이미지, 등록자, 등록날짜를 저장할 수 있음.
  - 물품 검색 : 물품명, 물품 기능, 물품 위치 등을 검색하여 물품을 찾을 수 있음.
  - 물품 사용 기록 : 물품을 사용할 때 해당 물품을 사용할 것이라고 표시해놓아 같은 기간내에 해당 물품이 필요한 학생이 있는 경우 그 학생에게 사용 가능 여부를 물어볼 수 있음. 혹은 이전에 그 물품을 사용한 학생에게 그 물품을 사용하는 방법에 대해 물어볼 수 있음.
4. 개발
  - client : React.js
  - server : Flask
  - DB : sqlite3
5. 기대 효과 및 활용
  - 예산 절약
  - 연구 진행 용이
  - 물품 사용 방법 자문 용이 
