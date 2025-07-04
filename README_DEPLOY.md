# MyRealTrip-Renewal Docker/배포/클라우드 가이드 (실전)

## 1. 환경변수 설정
- `.env.production` 파일에 운영 환경 변수 입력

## 2. 빌드 및 배포 (로컬/서버)
```bash
docker-compose build
docker-compose up -d
```
- http://localhost (또는 서버 도메인)에서 서비스 확인

## 3. HTTPS 적용 (옵션)
- `ssl.conf`를 nginx 설정에 적용
- Let's Encrypt 인증서 발급 후 `/etc/letsencrypt/live/도메인/`에 경로 지정

## 4. CI/CD 자동화 (예시: GitHub Actions)
- main 브랜치 push 시 도커 빌드/푸시 자동화
- secrets에 DOCKERHUB_USERNAME, DOCKERHUB_TOKEN 등록 필요

## 5. 헬스체크/자동 재시작
- 컨테이너 장애 시 자동 재시작(`restart: always`)
- 30초마다 curl로 헬스체크

## 6. 기타
- 볼륨 마운트, 로그, 프록시, 도메인 등 필요시 docker-compose.yml 수정

## 7. 볼륨 마운트/로그/인증서
- nginx 로그: ./logs/nginx:/var/log/nginx
- 인증서: ./certs:/etc/letsencrypt
- 정적 파일: ./public:/usr/share/nginx/html

## 8. 프록시(API 연동)
- nginx.conf에 location /api/ 프록시 예시 포함

## 9. AWS ECS/ECR 자동화
- GitHub Actions에서 ECR로 빌드/푸시, ECS 서비스 자동 업데이트
- secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, ECR_REPO, ECS_CLUSTER, ECS_SERVICE, ECS_TASK_DEF

### 예시: .env.production
```
VITE_API_URL=https://api.myrealtrip.com
VITE_SOME_KEY=xxxx
```

### 예시: docker-compose.yml
```
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    image: myrealtrip-renewal:latest
    restart: always
    ports:
      - "80:80"
    env_file:
      - .env.production
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 예시: ssl.conf (HTTPS)
```
server {
  listen 80;
  server_name myrealtrip.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name myrealtrip.com;
  ssl_certificate /etc/letsencrypt/live/myrealtrip.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/myrealtrip.com/privkey.pem;
  root /usr/share/nginx/html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

### 예시: .github/workflows/aws-ecs.yml
```yaml
name: Deploy to AWS ECS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build, tag, and push image to ECR
        run: |
          docker build -t ${{ secrets.ECR_REPO }}:latest .
          docker push ${{ secrets.ECR_REPO }}:latest
      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-update-task-definition@v1
        with:
          task-definition: ${{ secrets.ECS_TASK_DEF }}
          service: ${{ secrets.ECS_SERVICE }}
          cluster: ${{ secrets.ECS_CLUSTER }}
          wait-for-service-stability: true
```

## 10. S3 + CloudFront SPA 배포
- npm run build 후 S3에 업로드, CloudFront로 CDN 서빙
- aws cli, github actions 예시 포함

### 예시: .github/workflows/s3-cloudfront.yml
```yaml
name: Deploy to S3/CloudFront
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install deps & build
        run: |
          npm ci
          npm run build
      - name: Sync to S3
        run: aws s3 sync dist/ s3://myrealtrip-renewal --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DIST_ID }} --paths '/*'
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

---

문의/운영: DevOps 담당자 또는 관리자에게 문의 