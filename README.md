# ZzzImg
Targeting to be an easy-deploying aws-based person image-hosting service

## To get started 
### On Github Codespaces

```bash
npm install -g aws-cdk
cdk --version

# create a user in aws account and get access key and secret key
aws configure

cdk bootstrap
cdk synth
cdk diff
cdk deploy
```

### To develop python lambda
```bash
# install PDM
curl -sSL https://raw.githubusercontent.com/pdm-project/pdm/main/install-pdm.py | python3 -
```