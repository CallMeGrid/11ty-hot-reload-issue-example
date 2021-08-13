#!bin/bash
declare -a languages=("en" "es" "zh")

if [ "$NODE_ENV" == "production" ]; then
  npm run clean
fi

# loop through our languages array to generate the html of each language
for language in "${languages[@]}"
do
  LOCALE="$language" npm run build:eleventy
done
