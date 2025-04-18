import LineChart from "@/components/LineChart";

export default function Home() {


  return (
    <div className="whole-page-div w-screen h-screen flex flex-col gap-10 p-24 px-56">
      <h1 className=" ">Environmental Science Project 2</h1>

      <div className="energy-prod-graph-div w-full flex flex-col items-center justify-center">
        <LineChart
        csvPath="/data/production_by_type_us.csv"
        title="Energy Production by Source"
        height={700}
        width={1000}
        legendPosition="right"
        />

        <p>Click key in legend to toggle.</p>
      </div>

      <div className="energy-use-graphs-div w-full flex items-center justify-between gap-2">
        <LineChart
          csvPath="/data/use_by_type_us.csv"
          title="Energy Use by Type"
          height={500}
          width={500}
        />

        <LineChart
          csvPath="/data/rejected_used_and_total_energy_us.csv"
          title="Energy Waste and Use"
          height={500}
          width={500}
        />
      </div>


    </div>

    
  );
}
