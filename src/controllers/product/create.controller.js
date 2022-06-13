const { unSuccess, success } = require("../../utility/response");
const { emptyObject, emptyString, emptyNumber, invalidEmail, invalidPassword, invalidPincode, invalidPhone, invalidObjectId, emptyArray, notExistInArray } = require("../../utility/validations");
const mth = require('../../utility/math');
const productModel = require("../../models/product.model");

const create = async (req, res) => {
    try {


        // get body data
        const tokenData = req.tokenData;

        // get body data
        const data = req.body;

        if (emptyObject(data)) return unSuccess(res, 400, true, 'Post body is required!')

        let { images, brandName, title, filter, price, availableStock, size, highlights, category, sortDescription, size_fit, material_care, specification } = data

        // basic validation
        if (emptyArray(images)) return unSuccess(res, 400, true, 'Array of images are required!')
        if (emptyString(brandName)) return unSuccess(res, 400, true, 'BrandName id is required!')
        if (emptyString(title)) return unSuccess(res, 400, true, 'Title id is required!')
        if (emptyObject(price)) return unSuccess(res, 400, true, 'Price object is required!')
        if (emptyString(category)) return unSuccess(res, 400, true, 'Category is required!')
        if (emptyString(sortDescription)) return unSuccess(res, 400, true, 'SortDescription is required!')
        if (emptyString(size_fit)) return unSuccess(res, 400, true, 'Size_fit is required!')
        if (emptyString(material_care)) return unSuccess(res, 400, true, 'Material_care is required!')

        // availableStock validation
        if (emptyNumber(availableStock)) return unSuccess(res, 400, true, 'AvailableStock is required!')
        if (availableStock < 10) return unSuccess(res, 400, true, 'add minimum availableStock is > 9!')

        // destructure price
        let { mrp, total, includeTax } = price
        if (emptyNumber(mrp)) return unSuccess(res, 400, true, 'MRP is required!')

        if (emptyNumber(total)) return unSuccess(res, 400, true, 'Total price is required!')
        let discount = mth.roundOf(((mrp - total) / mrp) * 100)

        // size validation
        if (!size) return unSuccess(res, 400, true, 'Size is required!')
        if (!Array.isArray(size)) return unSuccess(res, 400, true, 'Size must be an array required!')
        if (notExistInArray(["XS", "S", "M", "L", "XL", "XXL", "XXXL"], size)) return unSuccess(res, 400, true, 'Size only accept any of - XS, S, M, L, XL, XXL, XXXL !')

        // filter validation
        if (emptyString(filter)) return unSuccess(res, 400, true, 'Filter id is required!')
        if (!["men", "women", "boys", "girls"].includes(filter)) return unSuccess(res, 400, true, 'Filter only accept any of - men, women, boys, girls !')

        // highlights validations
        if (!highlights || highlights.length == 0) return unSuccess(res, 400, true, 'Highlights is required as array!')

        // specification validation
        if (!specification || specification.length == 0) return unSuccess(res, 400, true, 'Specification is required as array of objects!')


        // object for creating 
        const object = {
            images,
            admin: tokenData.adminId,
            brandName,
            title,
            filter,
            price: {
                mrp,
                discount,
                total,
                includeTax
            },
            availableStock,
            size,
            highlights,
            category,
            sortDescription,
            size_fit,
            material_care,
            specification
        }

        const productCreate = await productModel.create(object)

        return success(res, 201, true, "Product created successfully!", productCreate)
    } catch (_) { return unSuccess(res, 500, true, _.message) }
}






module.exports = create