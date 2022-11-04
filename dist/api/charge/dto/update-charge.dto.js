"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChargeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_charge_dto_1 = require("./create-charge.dto");
class UpdateChargeDto extends (0, mapped_types_1.PartialType)(create_charge_dto_1.CreateChargeDto) {
}
exports.UpdateChargeDto = UpdateChargeDto;
//# sourceMappingURL=update-charge.dto.js.map