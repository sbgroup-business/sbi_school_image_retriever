deploy_dev() {
  aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 520336357590.dkr.ecr.sa-east-1.amazonaws.com
  docker build --no-cache -f Dockerfile --target dev -t image-retriever .
  docker tag image-retriever:latest 520336357590.dkr.ecr.sa-east-1.amazonaws.com/image-retriever:latest
  docker push 520336357590.dkr.ecr.sa-east-1.amazonaws.com/image-retriever:latest
}

deploy_prod() {
  aws ecr get-login-password --region us-east-1 --profile prdProfile | docker login --username AWS --password-stdin 211292617813.dkr.ecr.us-east-1.amazonaws.com
  docker build --no-cache  -f Dockerfile --target prod -t image-retriever .
  docker tag image-retriever:latest 211292617813.dkr.ecr.us-east-1.amazonaws.com/image-retriever:latest
  docker push 211292617813.dkr.ecr.us-east-1.amazonaws.com/image-retriever:latest
}

if [ $# -ne 1 ]; then
  echo "Uso: $0 <dev|prod>"
  exit 1
fi

stage=$1

if [ "$stage" != "dev" ] && [ "$stage" != "prod" ]; then
  echo "Stage inválido. Use 'dev' ou 'prod'."
  exit 1
fi

if [ "$stage" = "dev" ]; then
  echo "Executando deploy para o ambiente de desenvolvimento..."

  deploy_dev

  echo "Deploy para o ambiente de desenvolvimento concluído."

elif [ "$stage" = "prod" ]; then
  echo "Executando deploy para o ambiente de produção..."

  deploy_prod

  echo "Deploy para o ambiente de produção concluído."
fi
