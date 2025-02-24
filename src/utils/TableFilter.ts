
export const generatePaginationQuery = ({ page, limit,columns,sort,start_date,end_date,project,user,state}: any): string => {
  const params = new URLSearchParams();

  // Add the 'name[contains]' query parameter
  if(start_date) params.append('start_date', start_date);
  if(end_date) params.append('end_date', end_date);
  if(sort) params.append('sort', sort);
  if(project) params.append('project', project);
  if(state) params.append('state', state);
  if(user) params.append('user', user);
  
  if(columns){
    columns.map((column:any)=>{
      if(column.filterValue){
        if(column?.filterPropertyName){
          params.append(column.filterPropertyName , column.filterValue)
        }else{
          params.append(column.id , column.filterValue)
        }

      }
    })
  }
  // Add the 'page' and 'limit' query parameters
  if(page)params.append('page', page.toString());
  if(limit)params.append('page_size', limit.toString());

  // Return the formatted query string
  return `?${params.toString()}`;
};

export function generateQuery(queryParams:any) {
  // Construct the query string from queryParams
  const queryString = Object.entries(queryParams)
      .map(([key, value]:any) => {
          if (value !== undefined && value !== null && value!='') {
              return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
          return null; // Skip null or undefined values
      })
      .filter(Boolean) // Remove null entries
      .join("&");

  // Return the complete URL with the query string
  return `?${queryString}`;
}