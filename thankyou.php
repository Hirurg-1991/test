<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Спасибо!</title>
</head>
<body>
    <h1>Спасибо за заполненную форму!</h1>
    <p>GET параметры:</p>
    <ul>
        <?php
        foreach ($_GET as $key => $value) {
            echo "<li>$key: $value</li>";
        }
        ?>
    </ul>
</body>
</html>
