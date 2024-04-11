<?php

// print_r($_POST);

// Проверяем, был ли отправлен POST-запрос
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $fname = $_POST['name'];
    $lname = $_POST['lastname'];
    $email = $_POST['email'];
    
    $country_code = $_POST["country_code"];
    $number = str_replace([" ". "-"], "", $_POST['full_phone']);
    
    $ip = $_POST['ip'];
    $country = $_POST['country'];
    $sub1 = $_POST['sub1'];
    $sub2 = $_POST['sub2'];
    $sub3 = $_POST['sub3'];
    $sub4 = $_POST['sub4'];
    $sub5 = $_POST['sub5'];
    $pixel = $_POST['pixel'];

    // Создаем строку данных для отправки на веб-хук
    $data = array(
        'fname' => $fname,
        'lname' => $lname,
        'email' => $email,
        'fullphone' => $number,
        'ip' => $ip,
        'country' => $country,
        'buyerid' => $sub3,
        'source' => $sub1,
        'sub2' => $sub2,
        'sub3' => $sub3,
        'utm_source' => $sub4,
        'utm_campaign' => $sub4,
        'utm_content' => $sub5,
        'pixel' => $pixel,
    );

    // Определяем URL веб-хука
    $webhook_url = 'http://195.245.112.163/lander/mvtraffic-crm_1712575438/proccess.php';

    // Настраиваем параметры cURL-запроса
    $ch = curl_init($webhook_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

    curl_exec($ch);
    
    $redirect_url = 'thankyou.php?pixel=' . urlencode($pixel) . '&name=' . $fname . "&email=" . $email . "&phone=" . $fullphone;

    header('Location: ' . $redirect_url);
    exit;

    curl_close($ch);
    
} else {
    // Если не был отправлен POST-запрос, выводим сообщение об ошибке
    echo 'Ошибка: POST-запрос не был отправлен.';
}

$fname = $_POST['name'];
    $lname = $_POST['lastname'];
