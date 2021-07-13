export class ScheduleEvent {
  constructor (
    public id: string,
    public assignment: string,
    public time: string,
    public meal: {
      name: string,
      mealItems: string[],
      mealRecipe: string
    },
    public plannedEvent: {
      name: string,
      imageUrl: string,
      url: string,
      details: string[]
    }) {}
}
