

export function scrollbarAddClassHandler(e){
    var scrollbar = e.target.closest('.scrollbar__wrapper')
    if(scrollbar && scrollbar?.classList.contains('scroll')){
        scrollbar.classList.remove('scroll');
    }else if(scrollbar){
        scrollbar.classList.add('scroll');
    }
}