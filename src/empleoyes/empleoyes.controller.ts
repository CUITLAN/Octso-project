import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { EmpleoyesService } from "./empleoyes.service";
import { CreateEmpleoyeDto } from "./dto/create-empleoye.dto";
import { UpdateEmpleoyeDto } from "./dto/update-empleoye.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthUser } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constats";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Empleoye } from "./entities/empleoye.entity";
import { ApiAuth } from "src/auth/decorators/api.decorator";
import { AwsService } from "../aws/aws.service";
@ApiAuth()
@ApiTags("Empleoyees")
@Controller("empleoyees")
export class EmpleoyesController {
  constructor(
    private readonly empleoyesService: EmpleoyesService,
    private readonly AwsService: AwsService
  ) {}
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      Empleoyeemail: "Alan78707@gmail.com",
      Empleoyename: "Alan Orlando",
      EmpleoyelastName: "Trejo Tinajero",
    } as Empleoye,
  })

  // @AuthUser(ROLES.MANAGER)
  @Post()
  @UseInterceptors(FileInterceptor("EmpleoyephotoUrl"))
  async create(@Body() createEmpleoyeDto: CreateEmpleoyeDto, @UploadedFile() file: Express.Multer.File) {
    if(!file){
      return this.empleoyesService.create(createEmpleoyeDto);
    }else {
      const photoUrl = await this.AwsService.uploadFile(file)
      createEmpleoyeDto.EmpleoyephotoUrl= photoUrl
      return this.empleoyesService.create(createEmpleoyeDto)
    }
  }

  @AuthUser(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.empleoyesService.findAll();
  }
  @AuthUser(ROLES.MANAGER)
  @Get("/:id")
  findOne(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string
  ) {
    return this.empleoyesService.findOne(id);
  }

  // @AuthUser(ROLES.MANAGER, ROLES.ADMIN)
  @Get("/location/:id")
  async findAllLocation(@Param("id") id: string) {
    return await this.empleoyesService.findByLocation(+id);
  }

  @AuthUser(ROLES.EMPLEOYEE)
  @UseInterceptors(FileInterceptor("EmpleoyephotoUrl"))
  @Patch("/:id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateEmpleoyeDto: UpdateEmpleoyeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.originalname == "undefined") {
      console.log("NO PHOTO")
      return this.empleoyesService.update(id, updateEmpleoyeDto);
    } else {
      console.log("UPLOADING PHOTO...")
      const fileUrl = await this.AwsService.uploadFile(file);
      console.log("UPLOADED PHOTO")
      updateEmpleoyeDto.EmpleoyephotoUrl = fileUrl;
      return this.empleoyesService.update(id, updateEmpleoyeDto);
    }
  }

  @AuthUser(ROLES.MANAGER)
  @Delete("/:id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.empleoyesService.remove(id);
  }
  @AuthUser(ROLES.MANAGER, ROLES.EMPLEOYEE)
  @Post("/:id/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadPhoto(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const response = await this.AwsService.uploadFile(file);
    return this.empleoyesService.update(id, {
      EmpleoyephotoUrl: response,
    });
  }
}
