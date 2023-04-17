echo Наименование блока: 
read a
a=$(echo $a | sed 's/[^0-9 a-z A-Z [:punct:]]//g')
mkdir ./src/blocks/$a
touch ./src/blocks/$a/_$a.sass
touch ./src/blocks/$a/$a.pug
echo -e ".$a\n    display: block" >> ./src/blocks/$a/_$a.sass