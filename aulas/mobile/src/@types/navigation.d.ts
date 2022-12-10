//tipagem de rotas, tras a falicidade de mostrar para gente quais rotas existem

export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            //rotas sem parametro
            new: undefined;
            pools: undefined;
            find: undefined; 
            details:{
                id: string;
            }
        }
    }
}