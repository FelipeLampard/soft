const pagination = (data, items, page) => {
    const pageInt = Number(page);
    const itemsInt = Number(items);


    const StartIndex = (pageInt -1) * itemsInt;
    const EndIndex = pageInt * itemsInt; 

    const results = {}
    if(EndIndex< data.length){
        results.next ={
            page:pageInt + 1,
            items:itemsInt,
        };
    }
    if(EndIndex> 0){
        results.previous ={
            page:pageInt -1,
            items:itemsInt,
        };
}

results.results = data.slice(StartIndex, EndIndex);
return results;
}

export default pagination;