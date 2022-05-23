export class FormDataUtils {
    public static convertToFormData(object: any): FormData {
        const formData = new FormData();
        Object.keys(object).forEach(key => {
            if (object[key] != null) {
                formData.append(key, object[key]);
            }
        });
        return formData;
    }

    public static checkAndAppend(formData: FormData, key: string, file: File): void {
        if (file == null) {
            formData.delete(key);
        } else {
            formData.append(key, file, file.name);
        }
    }
}
