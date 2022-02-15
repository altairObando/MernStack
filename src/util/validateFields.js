/**
 * This method is common used for check if a query params from request
 * has values to filter data to query
 * @param {object} record Query params
 * @returns true if has values to apply filters
 * @author Noel Obando
 */
 const hasQueryValues   = (record) => Object.keys(record).some(k => record[k] && record[k] != null && record[k] != '');
 /**
  * Este método permite validar y generar un objeto listo para filtrar los datos de una consulta.
  * @param {object} record Query Params
  * @returns object with valid data
  * @author Noel Obando
  */
 const clearQueryValues = (record) => {
     let newQueryObject = {};
     Object.keys(record)
             .filter( k => record[k] && record[k] != null && record[k] != '')
             .forEach(key => {
                 newQueryObject[key] = record[key];
             });
     return newQueryObject;
 }

 module.exports = {
     hasQueryValues,
     clearQueryValues
 }