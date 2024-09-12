export const getCustomPropertieIcon = (type) => {
    if (type == 'free_text') {
        return 'far fa-pen-to-square';
    } else if (type == 'multiline_free_text') {
        return 'fas fa-bars';
    } else if (type == 'yes_or_no') {
        return 'far fa-thumbs-up';
    } else if (type == 'date') {
        return 'far fa-calendar-check';
    } else if (type == 'date_and_time') {
        return 'far fa-clock';
    } else if (type == 'single_choice') {
        return 'fas fa-list-check';
    } else if (type == 'multiple_choice') {
        return 'fas fa-list';
    } else if (type == 'real_number') {
        return 'fas fa-plus-minus';
    } else if (type == 'read_only') {
        return 'fas fa-book-open-reader';
    }
    return '';
}
