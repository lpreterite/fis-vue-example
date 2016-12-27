const fisconf = require('./build');

fisconf(fis);

fis.match('libs/font-awesome/{scss,less}/**',{
    release: false
});