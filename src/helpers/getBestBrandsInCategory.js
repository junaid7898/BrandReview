
export const getBestBrandsInCategory = ({brands, category}) => {
    
    const relatedBrands = brands.map(brand => {
        if(brand.category === category){
            return brand
        }
        else{
            return null
        }
    })

    

}
