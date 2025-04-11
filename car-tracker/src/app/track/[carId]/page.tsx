import {getCarData} from "@poc-car-tracker/app/service/getCarData";


interface Props {
    params: Promise<{ carId: string }>;
}

export default async function TrackCar({ params }: Props) {
    debugger;
    const { carId } = await params;
    const car = await getCarData(carId);
    const { checkpoints } = car ?? { checkpoints: [] };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Tracking Car: {carId}</h1>
            {checkpoints.map((cp, i) => (
                <div key={i}
                     className="border p-2 my-2">{cp.checkpoint} - {cp.timestamp.toDate().toLocaleString()}</div>
            ))}
        </div>
    );
}
