<?php
declare(strict_types=1);

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');

date_default_timezone_set('UTC');

const MAX_NUMBER_OF_DEPARTURES_PER_LINE = 3;

$departureJSON = file_get_contents('http://v0.ovapi.nl/stopareacode/583');
$departureData = json_decode($departureJSON, true);

$departures = [
    '20' => [],
    '25' => [],
];

if (!$departureData || !isset($departureData['583']['31001352']['Passes'])) {
    echo json_encode($departures);
}

function mapDestinationToLineNumber(string $destination): string
{
    return [
        'Rotterdam Centraal' => '20',
        'Schiebroek' => '25',
    ][$destination] ?? '-';
}

$departures = array_reduce(
    $departureData['583']['31001352']['Passes'],
    function (array $carry, array $pass): array {
        $line = mapDestinationToLineNumber($pass['DestinationName50']);

        $carry[$line][] = $pass['ExpectedDepartureTime'];

        return $carry;
    },
    $departures
);

foreach ($departures as $line => &$departureTimes) {
    sort($departureTimes);

    $departureTimes = array_slice($departureTimes, 0, MAX_NUMBER_OF_DEPARTURES_PER_LINE);
}

echo json_encode($departures);
