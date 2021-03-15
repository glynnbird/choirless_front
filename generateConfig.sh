#!/bin/bash

cd ../terraform
terraform output -json > ../choirless_front/config.json
cd ../choirless_front

