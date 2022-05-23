export class ObjectUtils {

    public static clone(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }

    public static cloneAndRemoveNulls(object: any): any {
        if (object == null) {
            return null;
        }

        const clonedObj = ObjectUtils.clone(object);

        Object.keys(clonedObj).forEach(key => {
            if (clonedObj[key] == null) {
                delete clonedObj[key];
            }
        });

        return clonedObj;
    }
}
