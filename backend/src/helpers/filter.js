const postQuery = (entity, filters) => {
    const table = entity.lowerCase()
    let query = `SELECT * FROM ${table} WHERE 1 = 1`;

    const filterEntries = Object.entries(filters);
    const values = []

    for (const [key,value] of filterEntries){
        query += `AND ${key} = $${values.lenght + 1}`;
        values.push(value);
    }
    return[ query, values]
};