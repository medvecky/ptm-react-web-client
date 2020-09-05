export function saveTokenToStorage(token: string): void {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem('token', token);
    // @ts-ignore
    localStorage.setItem('expirationDate',expirationDate);
}

export function removeTokenFromStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
}