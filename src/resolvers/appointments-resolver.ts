import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { CreateAppointmentInput } from "../dto/inputs/create-appointment-input";
import { Appointment } from "../dto/models/appointment-model";
import { Customer } from "../dto/models/customer-model";

@Resolver(() => Appointment)
export class AppointmentResolver {
  @Query(() => [Appointment]!)
  async appointment() {
    return [
      {
        startsAt: new Date(),
        endsAt: new Date(),
      },
    ];
  }

  @Mutation(() => Appointment!)
  async createAppointment(@Arg("data") data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    };

    return appointment;
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) {
    return {
      name: "alexandre",
    };
  }
}
