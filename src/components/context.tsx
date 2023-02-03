export const reloadCount = Number(sessionStorage.getItem("counter")) || 0;

export function reload(){
    if (reloadCount < 1){
        sessionStorage.setItem("counter",String(reloadCount+1));
        window.location.reload();
    } else {
        sessionStorage.removeItem("counter");
    }
}