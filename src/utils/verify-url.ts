
export default {
    avatar: (avatar: any) => {
        let urlAvatar: string;

        const url = avatar.split('/');
        if (url[5] !== 'null') {
            urlAvatar = avatar;
        } else {
            urlAvatar = `${url[0]}//${url[2]}/image/default.png`;
        }
        return urlAvatar;
    },

    cover: (cover: string) => {
        let urlCover: string;
        const url = cover.split('/');

        if(url[6] !== 'null'){
            urlCover = `${url[0]}//${url[2]}/image/cover.jpg`;
        }else{
            urlCover = cover;
        }
        return urlCover;
    }
}