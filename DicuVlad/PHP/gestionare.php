<?php
if (isset($_POST['adauga'])) {
    $echipa1 = $_POST['echipa1'];
    $echipa2 = $_POST['echipa2'];
    $jucator = $_POST['jucator'];

    $fisier = '../db/jucatori.json';

    $json_content = file_get_contents($fisier);
    $data = json_decode($json_content, true);

    if (!$data) {
        $data = [];
    }

    $nouaIntrare = [
        "cheie" => $echipa1 . "-" . $echipa2,
        "jucator" => $jucator
    ];

    $data[] = $nouaIntrare;

    file_put_contents($fisier, json_encode($data, JSON_PRETTY_PRINT));

    header("Location: ../pagina2.html");
    exit();
}
?>