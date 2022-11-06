let direcciones = [];

// direcciones.push({
//     p1: '172',
//     p2: '16',
//     p3: '198',
//     p4: '0'
// })

// direcciones.push({
//     p1: '172',
//     p2: '16',
//     p3: '186',
//     p4: '0'
// })

// direcciones.push({
//     p1: '172',
//     p2: '16',
//     p3: '184',
//     p4: '0'
// })

// direcciones.push({
//     p1: '172',
//     p2: '16',
//     p3: '182',
//     p4: '0
// })
let mascara = document.querySelector('.mascara');
function convert_binario(num) {
    let suma = 0;
    let resultado = '';
    for (let i = 7; i >= 0; i--) {
        let val = Math.pow(2, i);
        if (suma + val > num) {
            resultado += '0';
        } else {
            suma += val;
            resultado += '1';
        }
    }
    return resultado;
}
function convert_decimal(num) {
    let sum = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        let val = parseInt(num[num.length - i - 1]);
        if (val == 1) {
            sum += Math.pow(2, i);
        }
    }
    return sum;
}

function llenar_tabla() {
    $('.tabla').html('');
    for (let i = 0; i < direcciones.length; i++) {
        $('.tabla').append(`
        <tr>
          <td>${i + 1}</td>
          <td>${direcciones[i].p1}.${direcciones[i].p2}.${direcciones[i].p3}.${direcciones[i].p4}/${mascara.value}</td>
          <td><button class="btn shadow-sm" onclick="eliminar(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`);
    }
}
function eliminar(idx) {
    direcciones.splice(idx, 1);
    llenar_tabla();
}
$('.btn-agregar').click(function (e) {
    e.preventDefault();
    let ips = document.querySelectorAll('.ip');
    direcciones.push({
        p1: ips[0].value,
        p2: ips[1].value,
        p3: ips[2].value,
        p4: ips[3].value
    })

    llenar_tabla();
});

function resultado() {
    let aux = [];
    let cont = 0;
    for (let i = 0; i < direcciones.length; i++) {
        let p1 = convert_binario(direcciones[i].p1);
        let p2 = convert_binario(direcciones[i].p2);
        let p3 = convert_binario(direcciones[i].p3);
        let p4 = convert_binario(direcciones[i].p4);
        aux.push(p1 + p2 + p3 + p4);
    }
    let aux2 = new Array(aux.length);
    for (let i = 0; i < aux.length; i++) {
        aux2[i] = new Array(32);
    }
    for (let i = 0; i < aux.length; i++) {
        for (let j = 0; j < 32; j++) {
            aux2[i][j] = '0';
        }
    }
    for (let i = 0; i < 32; i++) {
        let inicio = aux[0][i];
        for (let j = 0; j < aux.length; j++) {
            if (aux[j][i] != inicio) {
                return { data: aux2, prefijo: cont }
            }
        }
        for (let j = 0; j < aux.length; j++) {
            aux2[j][i] = aux[j][i];
        }
        cont++;
    }

    return aux2;
}

function convert_resultado() {
    let res = resultado();
    console.log(res);
    let { data } = res;
    let { prefijo } = res;
    let lop = [];
    for (let i = 0; i < data.length; i++) {
        let cadena = convert_decimal(getCadena(data[i], 0, 8));
        cadena += '.' + convert_decimal(getCadena(data[i], 8, 16));
        cadena += '.' + convert_decimal(getCadena(data[i], 16, 24));
        cadena += '.' + convert_decimal(getCadena(data[i], 24, 32));
        lop.push(cadena);
    }

    $('.resultado').html('');
    for (let i = 0; i < direcciones.length; i++) {
        let p1 = convert_binario(direcciones[i].p1);
        let p2 = '.' + convert_binario(direcciones[i].p2);
        let p3 = '.' + convert_binario(direcciones[i].p3);
        let p4 = '.' + convert_binario(direcciones[i].p4);
        $('.resultado').append(`<span class="fs-5"> > ${p1 + p2 + p3 + p4}</span></br>`);
    }

    let cadena = getCadena(data[0], 0, 8);
    cadena += '.' + getCadena(data[0], 8, 16);
    cadena += '.' + getCadena(data[0], 16, 24);
    cadena += '.' + getCadena(data[0], 24, 32);

    $('.resultado').append(`</br><span class="fs-5">> ${cadena}</span>`);
    $('.resultado').append(`</br><span class="fs-5">La dirección sumarizada es: ${lop[0]}/${prefijo}</span>`);
}

$('#btnResultado').click(function (e) {
    e.preventDefault();
    convert_resultado();
});
function getCadena(arr, inicio, fin) {
    let cad = '';
    for (let i = inicio; i < fin; i++) {
        cad += arr[i];
    }
    return cad;
}
function obtener_mascara() {
    let val = parseInt(document.querySelector('#input-mascara').value);
    let arr = [];
    for (let i = 0; i < 32; i++) {
        if (val > i) {
            arr.push('1');
        } else {
            arr.push('0');
        }
    }
    let p1 = getCadena(arr, 0, 8);
    let p2 = getCadena(arr, 8, 16);
    let p3 = getCadena(arr, 16, 24);
    let p4 = getCadena(arr, 24, 32);
    let combi = p1 + '.' + p2 + '.' + p3 + '.' + p4;
    $('.result-mascara').html(``);
    $('.result-mascara').append(`<span>${val} bits = ${combi}</span>`);
    p1 = convert_decimal(getCadena(arr, 0, 8));
    p2 = convert_decimal(getCadena(arr, 8, 16));
    p3 = convert_decimal(getCadena(arr, 16, 24));
    p4 = convert_decimal(getCadena(arr, 24, 32));
    combi = p1 + '.' + p2 + '.' + p3 + '.' + p4;
    $('.result-mascara').append(`<span> = ${combi}</span>`);
}


function resultDecimal() {
    let num = document.querySelector('#input-decimal').value;
    $('.result-convertir-decimal').html(``);
    $('.result-convertir-decimal').append(`<span>Resultado:  ${convert_decimal(num)}</span>`);
}
function resultBinario() {
    let num = document.querySelector('#input-binario').value;
    $('.result-convertir-binario').html(``);
    $('.result-convertir-binario').append(`<span>Resultado:  ${convert_binario(num)}</span>`);
}