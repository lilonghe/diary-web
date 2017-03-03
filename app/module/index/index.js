import $ from 'jquery';
class Index{
    constructor(){
        console.log('index');
        console.log('this is index.');

        $('body').append('<div style="color:red;">Hello! I am jquery.</div>');
    }
}
export default new Index();