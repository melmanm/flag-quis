
export interface quizItem{
    flagImgURL: string;
    countryName: string; 
}

export interface quizItemWithPossibilities{
    quizItem: quizItem;
    possibilities: string[];
}