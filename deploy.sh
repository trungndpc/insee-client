
local_dir=./
server=stackops@61.28.229.63

rsync -a $local_dir/build/ $server:/var/www/cuahang.insee.udev.com.vn/html
