export class ScheduleEvent {
  constructor (
    public id: string,
    public day: string,
    public assignment: string,
    public time: string,
    public meal: {
      name: string,
      mealItems: string[],
      mealRecipe: string,
      mealInstructions: string,
      mealUrl: string
    },
    public plannedEvent: {
      name: string,
      imageUrl: string,
      url: string,
      details: string[],
      subject: string,
      notes: string,
      location: string
    }) {}
}
