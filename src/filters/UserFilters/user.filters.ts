// Define e exporta os filtros de usuário
export function applyUserFilters(query: any) {
    const filters: any = {};
  
    if (query.name) {
      filters.name = { contains: query.name, mode: 'insensitive' };
    }
  
    if (query.email) {
      filters.email = query.email;
    }
  
    if (query.active !== undefined) {
      filters.active = query.active === 'true' ? true : query.active === 'false' ? false : undefined;
    }
  
    return filters;
  }