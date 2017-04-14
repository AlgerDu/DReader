/**
 * 创建新的 uuid 来源 http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
 * @export
 * @returns 
 */
export function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/**
 * 判断一个字符串为 null 或者 空字符串
 * @export
 * @param {string} value 
 * @returns {boolean} 
 */
export function IsEmptyOfNull(value: string): boolean {
    if (value == null || value == '')
        return true;
    else
        return false;
}