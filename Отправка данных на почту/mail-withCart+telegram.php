<?
require_once 'PHPMailer/PHPMailerAutoload.php';
$token = "1235165029:AAEBKTodpUoM5nwEfJ-y-tavF9w88RO7htY";
$chat_id = "477577708";

$admin_email = array();
foreach ( $_POST["admin_email"] as $key => $value ) {
	array_push($admin_email, $value);
}

$form_subject = trim($_POST["form_subject"]);

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

// Настройки SMTP
// $mail->isSMTP();
// $mail->SMTPAuth = true;
// $mail->SMTPDebug = 0;

// $mail->Host = 'ssl://smtp.gmail.com';
// $mail->Port = 465;
// $mail->Username = 'Логин';
// $mail->Password = 'Пароль';

$myArray = json_decode($_POST['Товары'], true);
$prod = '';
foreach ($myArray as $key => $value) {
		$title = $value["title"];
		$quantity = $value["quantity"];
		$measure = $value["measure"];
	    $prod .= "
			<tr>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$title</td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$quantity</td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$measure</td>
			</tr>
			";
	}


$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject"  && $key != "Товары") {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
		<td style='padding: 10px; width: auto;'><b>$key:</b></td>
		<td style='padding: 10px;width: 100%;'>$value</td>
		</tr>
		";
	}
}
$message = "<table style='width: 50%;'>$message . $prod</table>";


// От кого
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Заказ с магазина Everest');

// Кому
foreach ( $admin_email as $key => $value ) {
	$mail->addAddress($value);
}
// Тема письма
$mail->Subject = $form_subject;

// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);

// Приложения
if ($_FILES){
	foreach ( $_FILES['file']['tmp_name'] as $key => $value ) {
		$mail->addAttachment($value, $_FILES['file']['name'][$key]);
	}
}
$mail->send();

$delivery = $_POST['Тип доставки'];
$name = $_POST['Имя'];
$surname = $_POST['Фамилия'];
$telephone = $_POST['Телефон'];
$adress = $_POST['Адрес'];
$total = $_POST['Итого'];
$payment = $_POST['Способ оплаты'];
$products = '';
foreach ($myArray as $key => $value) {
	$title = trim($value["title"]);
	$quantity = $value["quantity"];
	$measure = $value["measure"];
	$products .= "%0AНазвание: " . $title . "%0AКоличество: " . $quantity . "%0AИзмерение: " . $measure . "%0A";
}
$arr = array(
	"Тип доставки" => $delivery,
	"Имя" => $name,
	"Фамилия" => $surname,
	"Телефон" => $telephone,
	"Адрес" => $adress,
	"Способ оплаты" => $payment,
	"Итого" => $total,
	"Товары" => $products
);

foreach($arr as $key => $value) {
	$txt .= "<b>".$key."</b>: ".$value."%0A";
};
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
?>