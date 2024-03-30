const HATEOAS = async (entity, data) => {
    const results = data.map((item) => {
        return {
            nombre: item.nombre,
            links: [
                {
                    href: `http://localhost:3000/api/v1/${entity}/${item.id}`
                }
            ]
        }
    }).slice(0, 4)

    const total = data.length
    const dataWithHateoas = {
        total,
        results,
    };
    console.log(dataWithHateoas);
    return dataWithHateoas;


};

export default HATEOAS;