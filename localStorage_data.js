/* ===============================
   دوال إدارة بيانات الموظفين والمبيعات
=============================== */

// ===== الموظفين =====
// صيغة التخزين:
// employees = [
//   { name: "الاسم الكامل", username: "user1", password: "pass1" }
// ]

function getEmployees() {
    return JSON.parse(localStorage.getItem("employees") || "[]");
}

function saveEmployees(employees) {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// إضافة موظف جديد
function addEmployee(name, username, password) {
    const employees = getEmployees();
    if(employees.some(emp => emp.username === username)){
        alert("اسم المستخدم موجود بالفعل!");
        return false;
    }
    employees.push({ name, username, password });
    saveEmployees(employees);
    return true;
}

// تسجيل الدخول للموظف
function loginEmployee(username, password) {
    const employees = getEmployees();
    const emp = employees.find(e => e.username === username && e.password === password);
    if(emp){
        localStorage.setItem("currentEmployee", username);
        return true;
    }
    return false;
}

// تسجيل الخروج للموظف
function logoutEmployee(){
    localStorage.removeItem("currentEmployee");
}

// جلب الموظف الحالي
function currentEmployee() {
    return localStorage.getItem("currentEmployee");
}

// ===== المبيعات =====
// صيغة التخزين:
// sales = [
//   { employee: "user1", type: "network", amount: 100, date: "2025-11-26", time: "10:25" }
// ]

function getSales() {
    return JSON.parse(localStorage.getItem("employeeSales") || "[]");
}

function saveSales(sales) {
    localStorage.setItem("employeeSales", JSON.stringify(sales));
}

// إضافة عملية بيع (موظف معين)
function addSale(employee, type, amount) {
    const sales = getSales();
    const now = new Date();
    const time = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute:'2-digit' });
    const date = now.toISOString().split('T')[0];
    sales.push({ employee, type, amount, date, time });
    saveSales(sales);
}

// فلترة المبيعات حسب الموظف وتاريخ
function filterSalesByEmployeeAndDate(employee, from, to) {
    const sales = getSales();
    return sales.filter(s => s.employee === employee && s.date >= from && s.date <= to);
}

// ===== مدير النظام =====
const adminUser = "admin";
const adminPass = "12345"; // يمكنك تغييره حسب الحاجة

function loginAdmin(username, password){
    if(username === adminUser && password === adminPass){
        localStorage.setItem("currentAdmin", username);
        return true;
    }
    return false;
}

function logoutAdmin(){
    localStorage.removeItem("currentAdmin");
}

function currentAdmin(){
    return localStorage.getItem("currentAdmin");
}

// ===== حماية الصفحات =====
function requireAdminLogin(){
    if(!currentAdmin()){
        alert("⚠ يجب تسجيل الدخول كمدير أولاً!");
        window.location.assign("admin-login.html");
    }
}

function requireEmployeeLogin(){
    if(!currentEmployee()){
        alert("⚠ يجب تسجيل الدخول كموظف أولاً!");
        window.location.assign("employee-login.html");
    }
}
