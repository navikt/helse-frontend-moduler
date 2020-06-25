export const brukerinfo = {
    navn: 'Kong Harald',
    ident: 'D123456',
    enhet: 'NAV Slottet',
    rolle: 'Konge'
};

export const onSøk = (søkeverdi: string) => {
    console.log('Du søkte etter:', søkeverdi);
    return Promise.resolve();
};
